from django.http import JsonResponse

from .models import Conference, Location


def api_list_conferences(request):
    response = []
    conferences = Conference.objects.all()
    for conference in conferences:
        response.append(
            {
                "name": conference.name,
                "href": conference.get_api_url(),
            }
        )
    return JsonResponse({"conferences": response})


def api_show_conference(request, id):
    conference = Conference.objects.get(id=id)
    return JsonResponse(
        {
            "name": conference.name,
            "starts": conference.starts,
            "ends": conference.ends,
            "description": conference.description,
            "created": conference.created,
            "updated": conference.updated,
            "max_presentations": conference.max_presentations,
            "max_attendees": conference.max_attendees,
            "location": {
                "name": conference.location.name,
                "href": conference.location.get_api_url(),
            },
        }
    )


def api_list_locations(request):
    """
    Lists the location names and the link to the location.

    Returns a dictionary with a single key "locations" which
    is a list of location names and URLS. Each entry in the list
    is a dictionary that contains the name of the location and
    the link to the location's information.

    {
        "locations": [
            {
                "name": location's name,
                "href": URL to the location,
            },
            ...
        ]
    }
    """
    return JsonResponse({})


def api_show_location(request, id):
    """
    Returns the details for the Location model specified
    by the id parameter.

    This should return a dictionary with the name, city,
    room count, created, updated, and state abbreviation.

    {
        "name": location's name,
        "city": location's city,
        "room_count": the number of rooms available,
        "created": the date/time when the record was created,
        "updated": the date/time when the record was updated,
        "state": the two-letter abbreviation for the state,
    }
    """
    return JsonResponse({})
