from common.json import ModelEncoder
from .models import Attendee, ConferenceVO, AccountVO


class ConferenceVODetailEncoder(ModelEncoder):
    model = ConferenceVO
    properties = [
        "name",
        "import_href",
    ]


class AttendeeListEncoder(ModelEncoder):
    model = Attendee
    properties = [
        "name",
    ]

    def get_extra_data(self, o):
        return {"conference": o.conference.name}


class AttendeeDetailEncoder(ModelEncoder):
    model = Attendee
    properties = [
        "email",
        "name",
        "company_name",
        "created",
        "conference",
    ]
    encoders = {
        "conference": ConferenceVODetailEncoder(),
    }

    def get_extra_data(self, o):
        count = AccountVO.objects.filter(email=o.email)
        if len(count) > 0:
            return {"has_account": True}
        else:
            return {"has_account": False}
