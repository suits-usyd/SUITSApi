from flask_restful import Resource
from webargs.flaskparser import use_args
from auth import auth_required

from app import db
from . import Model, Schema

class Event(Resource):

    @auth_required
    def get(self, id):
        e = Model.query.get_or_404(id)
        schema = Schema()
        return schema.jsonify(e)

    @auth_required
    @use_args(Schema)
    def put(self, event_data, id):
        e = Model.query.get_or_404(id)

        for field in event_data:
            setattr(e, field, event_data[field])

        db.session.commit()

        schema = Schema(exclude=('members_attended',))
        return schema.jsonify(e)

    @auth_required
    def delete(self, id):
        e = Model.query.get_or_404(id)

        db.session.delete(e)
        db.session.commit()

