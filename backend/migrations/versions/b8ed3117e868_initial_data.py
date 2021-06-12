"""Initial data

Revision ID: b8ed3117e868
Revises: d2fda22f67ca
Create Date: 2021-04-25 21:59:40.427204

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime, date
from sqlalchemy.sql import table, column
from sqlalchemy import String, Integer, DateTime, Date, Numeric, Boolean

# revision identifiers, used by Alembic.
revision = 'b8ed3117e868'
down_revision = '5d2727a0e7d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    client = table('client',
                   column('id', Integer),
                   column('name', String),
                   column('tax_id', String),
                   column('currency', sa.Enum('EUR', 'USD', 'PLN', name='currency')),
                   column('street_with_number', String),
                   column('zip_code', String),
                   column('city', String),
                   column('archived', Boolean),
                   column('created_at', DateTime)
                   )

    project = table('project',
                    column('id', Integer),
                    column('client_id', Integer),
                    column('name', String),
                    column('archived', Boolean),
                    column('created_at', DateTime)
                    )

    task = table('task',
                 column('id', Integer),
                 column('project_id', Integer),
                 column('name', String),
                 column('archived', Boolean),
                 column('created_at', DateTime)
                 )

    user = table('user',
                 column('id', Integer),
                 column('name', String),
                 column('roles', sa.JSON()),
                 column('created_at', DateTime)
                 )

    oauth = table('flask_dance_oauth',
                  column('id', Integer),
                  column('user_id', Integer),
                  column('provider', String),
                  column('provider_user_id', String),
                  column('token', sa.JSON()),
                  column('created_at', DateTime)
                  )

    team = table('team',
                 column('id', Integer),
                 column('name', String),
                 column('description', String),
                 column('archived', Boolean),
                 column('created_at', DateTime)
                 )

    team_member = table('team_member',
                        column('user_id', Integer),
                        column('team_id', Integer),
                        column('created_at', DateTime)
                        )

    project_assignment = table('project_assignment',
                               column('user_id', Integer),
                               column('project_id', Integer),
                               column('begin_date', Date),
                               column('end_date', Date),
                               column('hourly_rate', Numeric),
                               column('created_at', DateTime)
                               )
    # ### clients ###
    conn = op.get_bind()
    [c1] = conn.execute(client.insert().returning(client.c.id).values(
        {'name': 'Jeronimo Martins', 'currency': 'PLN', 'tax_id': 'PL7791011327', 'street_with_number': 'ul. Żniwna 5',
            'zip_code': '62-025', 'city': 'Kostrzyn', 'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    [p1] = conn.execute(project.insert().returning(project.c.id).values(
        {'name': 'Online Shop', 'client_id': c1,
            'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    op.bulk_insert(task, [
        {'name': 'Maintanance', 'project_id': p1,
            'archived': False, 'created_at': datetime.now()},
        {'name': 'Development', 'project_id': p1,
            'archived': False, 'created_at': datetime.now()}
    ])

    [c2] = conn.execute(client.insert().returning(client.c.id).values(
        {'name': 'Volkswagen Poznań', 'currency': 'PLN', 'tax_id': 'PL7820032965', 'street_with_number': 'ul. Warszawska 349',
            'zip_code': '61-060', 'city': 'Poznań', 'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    [p2] = conn.execute(project.insert().returning(project.c.id).values(
        {'name': 'Assembly Line Automation', 'client_id': c2,
            'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    [p3] = conn.execute(project.insert().returning(project.c.id).values(
        {'name': 'Smart Manufacturing', 'client_id': c2,
            'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    op.bulk_insert(task, [
        {'name': 'Gathering requirements',
            'project_id': p2, 'archived': False, 'created_at': datetime.now()},
        {'name': 'Monitoring', 'project_id': p3,
            'archived': False, 'created_at': datetime.now()},
        {'name': 'Reporting', 'project_id': p3,
            'archived': False, 'created_at': datetime.now()}
    ])

    # ### users ###
    [u1] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Jan Kowalski', 'roles': ['manager'], 'created_at': datetime.now()}
    )).fetchone()

    [u2] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Piotr Nowak', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u3] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Anna Wiśniewska', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u4] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Krzysztof Wójcik', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u5] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Maria Kamińska', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u6] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Paweł Lewandowski', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u7] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Małgorzata Zielińska', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    [u8] = conn.execute(user.insert().returning(user.c.id).values(
        {'name': 'Agnieszka Szymańska', 'roles': [], 'created_at': datetime.now()}
    )).fetchone()

    op.bulk_insert(oauth, [
        {'provider': 'oidc', 'provider_user_id': 'bb7ddace-0b8d-499b-b1d3-9413e2d01663', 'user_id': u1,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': 'add4a674-89fb-4506-b5f0-c8220c0ab4ec', 'user_id': u2,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': 'ebebc5c6-66f9-4024-bdb3-5ab77c9a9ad3', 'user_id': u3,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': '065c9569-e817-43ce-9e66-5ac51c119325', 'user_id': u4,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': '2da35026-274f-444b-be21-f0a2fffe4552', 'user_id': u5,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': '979a936f-f4be-4b51-a98c-2c66952f2d40', 'user_id': u6,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': 'fd7d51ee-57f0-472f-b6e2-bb9fe00b55fb', 'user_id': u7,
            'token': {}, 'created_at': datetime.now()},
        {'provider': 'oidc', 'provider_user_id': 'a2828b8a-6352-4b7a-8334-b94e6b32deaf', 'user_id': u8,
            'token': {}, 'created_at': datetime.now()}
    ])

    # ### teams ###
    [t1] = conn.execute(team.insert().returning(team.c.id).values(
        {'name': 'Lazy Developers', 'description': 'They never get things done', 'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    [t2] = conn.execute(team.insert().returning(team.c.id).values(
        {'name': 'Uncreative Designers', 'description': 'They always copy existing things', 'archived': False, 'created_at': datetime.now()}
    )).fetchone()

    op.bulk_insert(team_member, [
        {'user_id': u2, 'team_id': t1, 'created_at': datetime.now()},
        {'user_id': u3, 'team_id': t1, 'created_at': datetime.now()},
        {'user_id': u4, 'team_id': t1, 'created_at': datetime.now()},
        {'user_id': u5, 'team_id': t1, 'created_at': datetime.now()}
    ])

    op.bulk_insert(team_member, [
        {'user_id': u5, 'team_id': t2, 'created_at': datetime.now()},
        {'user_id': u6, 'team_id': t2, 'created_at': datetime.now()},
        {'user_id': u7, 'team_id': t2, 'created_at': datetime.now()},
        {'user_id': u8, 'team_id': t2, 'created_at': datetime.now()}
    ])

    # ### project assignments ###
    op.bulk_insert(project_assignment, [
        {'user_id': u1, 'project_id': p1, 'begin_date': date(2021, 1, 1), 'end_date': date(2021, 12, 31),
            'hourly_rate': 120.00, 'created_at': datetime.now()},
        {'user_id': u1, 'project_id': p2, 'begin_date': date(2021, 1, 1), 'end_date': date.max,
            'hourly_rate': 160.00, 'created_at': datetime.now()},
        {'user_id': u1, 'project_id': p3, 'begin_date': datetime.min, 'end_date': date(2021, 12, 31),
            'hourly_rate': 140.00, 'created_at': datetime.now()},
        {'user_id': u2, 'project_id': p1, 'begin_date': datetime.min, 'end_date': date(2021, 5, 31),
            'hourly_rate': 70.00, 'created_at': datetime.now()},
        {'user_id': u2, 'project_id': p1, 'begin_date': date(2021, 6, 1), 'end_date': date.max,
            'hourly_rate': 80.00, 'created_at': datetime.now()},
        {'user_id': u2, 'project_id': p2, 'begin_date': datetime.min, 'end_date': date(2021, 5, 31),
            'hourly_rate': 95.00, 'created_at': datetime.now()},
        {'user_id': u2, 'project_id': p3, 'begin_date': date(2021, 6, 1), 'end_date': date.max,
            'hourly_rate': 115.00, 'created_at': datetime.now()}
    ])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    client = table('client')
    project = table('project')
    task = table('task')
    user = table('user')
    oauth = table('flask_dance_oauth')
    team = table('team')
    team_member = table('team_member')
    project_assignment = table('project_assignment')
    op.execute(project_assignment.delete())
    op.execute(team_member.delete())
    op.execute(team.delete())
    op.execute(oauth.delete())
    op.execute(user.delete())
    op.execute(task.delete())
    op.execute(project.delete())
    op.execute(client.delete())
    # ### end Alembic commands ###
