"""Adding Holiday requests

Revision ID: 437c113eae36
Revises: 2be0d9d3ad4f
Create Date: 2021-05-22 09:04:46.364056

"""
from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision = '437c113eae36'
down_revision = '2be0d9d3ad4f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    holiday_request_status = op.create_table('holiday_request_status',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    holiday_request_type = op.create_table('holiday_request_type',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('short_code', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('holiday_request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('type_id', sa.Integer(), nullable=True),
    sa.Column('status_id', sa.Integer(), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['status_id'], ['holiday_request_status.id'], ),
    sa.ForeignKeyConstraint(['type_id'], ['holiday_request_type.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


    op.bulk_insert(holiday_request_status, [
        {'id': 1, 'name': 'Pending'},
        {'id': 2, 'name': 'Accepted'},
        {'id': 3, 'name': 'Rejected'},
        {'id': 4, 'name': 'Cancelled'}
        
    ])

    op.bulk_insert(holiday_request_type, [
        {'name': 'Holiday', 'short_code': "HR"},
        {'name': 'On demand', 'short_code': "OD"},
        {'name': 'Unpaid', 'short_code': "UP"},
        {'name': 'Child care', 'short_code': "CC"},
        {'name': 'Compassionate leave', 'short_code': "CL"},
        {'name': 'Sick leave', 'short_code': "L4"},
    ])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('holiday_request')
    op.drop_table('holiday_request_type')
    op.drop_table('holiday_request_status')
    # ### end Alembic commands ###
