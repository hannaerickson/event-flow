import json
from django.http import JsonResponse
from .models import Conference, Location, State
from django.views.decorators.http import require_http_methods
from .acls import get_photo, get_weather_data
from .encoders import (
    LocationListEncoder,
    LocationDetailEncoder,
    ConferenceListEncoder,
    ConferenceDetailEncoder
)


@require_http_methods(["GET", "POST"])
def api_list_conferences(request):
    if request.method == "GET":
        conferences = Conference.objects.all()
        return JsonResponse(
            {"conferences": conferences},
            encoder=ConferenceListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            location = Location.objects.get(id=content["location"])
            content["location"] = location
        except Location.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location ID"},
                status=400,
            )
        conference = Conference.objects.create(**content)
        return JsonResponse(
            conference,
            encoder=ConferenceDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_conference(request, id):
    if request.method == "GET":
        try:
            conference = Conference.objects.get(id=id)
            weather = get_weather_data(
                conference.location.city,
                conference.location.state.abbreviation,
            )
            return JsonResponse(
                {"conference": conference, "weather": weather},
                encoder=ConferenceDetailEncoder,
                safe=False,
            )
        except Conference.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference ID"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Conference.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "state" in content:
                state = State.objects.get(abbreviation=content["state"])
                content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid State abbreviation"},
                status=400,
            )
        Conference.objects.filter(id=id).update(**content)
        conference = Conference.objects.get(id=id)
        return JsonResponse(
            conference,
            encoder=ConferenceDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def api_list_locations(request):
    if request.method == "GET":
        locations = Location.objects.all()
        return JsonResponse(
            {"locations": locations},
            encoder=LocationListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            state = State.objects.get(abbreviation=content["state"])
            content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid State abbreviation"},
                status=400,
            )
        photo = get_photo(content["city"], content["state"].abbreviation)
        content.update(photo)
        location = Location.objects.create(**content)
        return JsonResponse(
            location,
            encoder=LocationDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_location(request, id):
    if request.method == "GET":
        try:
            location = Location.objects.get(id=id)
            return JsonResponse(
                location,
                encoder=LocationDetailEncoder,
                safe=False,
            )
        except Location.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location ID"},
                status=400
            )
    elif request.method == "DELETE":
        count, _ = Location.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        try:
            if "state" in content:
                state = State.objects.get(abbreviation=content["state"])
                content["state"] = state
        except State.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid State abbreviation"},
                status=400,
            )
        Location.objects.filter(id=id).update(**content)
        location = Location.objects.get(id=id)
        return JsonResponse(
            location,
            encoder=LocationDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_list_states(request):
    states = State.objects.order_by('name')
    state_list = []
    for state in states:
        state_dict = {state.name: state.abbreviation}
        state_list.append(state_dict)
    return JsonResponse({"states": state_list})
