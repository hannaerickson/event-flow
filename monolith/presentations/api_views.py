import json
import pika
from django.http import JsonResponse
from .models import Presentation
from events.models import Conference
from .encoders import PresentationListEncoder, PresentationDetailEncoder
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET", "POST"])
def api_list_presentations(request, conference_id):
    if request.method == "GET":
        presentations = Presentation.objects.all()
        return JsonResponse(
            {"presentations": presentations},
            encoder=PresentationListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            conference = Conference.objects.get(id=conference_id)
            content["conference"] = conference
        except Conference.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference ID"},
                status=400,
            )
        presentation = Presentation.create(**content)
        return JsonResponse(
            presentation,
            encoder=PresentationDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_presentation(request, id):
    if request.method == "GET":
        try:
            presentation = Presentation.objects.get(id=id)
            return JsonResponse(
                presentation,
                encoder=PresentationDetailEncoder,
                safe=False,
            )
        except Presentation.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid presentation ID"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Presentation.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
    Presentation.objects.filter(id=id).update(**content)
    presentation = Presentation.objects.get(id=id)
    return JsonResponse(
        presentation,
        encoder=PresentationDetailEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_approve_presentation(request, id):
    presentation = Presentation.objects.get(id=id)
    presentation.approve()

    parameters = pika.ConnectionParameters(host="rabbitmq")
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    channel.queue_declare(queue="presentation_approvals")
    channel.basic_publish(
        exchange="",
        routing_key="presentation_approvals",
        body=json.dumps(
            {
                "presenter_name": presentation.presenter_name,
                "presenter_email": presentation.presenter_email,
                "title": presentation.title,
            }
        ),
    )
    connection.close()
    return JsonResponse(
        presentation,
        encoder=PresentationDetailEncoder,
        safe=False,
    )


@require_http_methods(["PUT"])
def api_reject_presentation(request, id):
    presentation = Presentation.objects.get(id=id)
    presentation.reject()

    parameters = pika.ConnectionParameters(host="rabbitmq")
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    channel.queue_declare(queue="presntation_rejections")
    channel.basic_publish(
        exchange="",
        routing_key="presentation_rejections",
        body=json.dumps(
            {
                "presenter_name": presentation.presenter_name,
                "presenter_email": presentation.presenter_email,
                "title": presentation.title,
            }
        ),
    )
    connection.close()
    return JsonResponse(
        presentation,
        encoder=PresentationDetailEncoder,
        safe=False,
    )
