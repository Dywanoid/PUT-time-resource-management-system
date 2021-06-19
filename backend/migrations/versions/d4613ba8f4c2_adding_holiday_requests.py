"""Adding holiday requests

Revision ID: d4613ba8f4c2
Revises: b8ed3117e868
Create Date: 2021-06-16 16:23:09.339095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd4613ba8f4c2'
down_revision = 'b8ed3117e868'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('holiday_request',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('changed_by_id', sa.Integer(), nullable=True),
    sa.Column('type', sa.Enum('HOLIDAY', 'ON_DEMAND', 'UNPAID', 'CHILD_CARE', 'COMPASSIONATE_LEAVE', 'SICK_LEAVE', name='holidayrequesttype'), nullable=False),
    sa.Column('status', sa.Enum('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', name='holidayrequeststatus'), nullable=False),
    sa.Column('start_date', sa.DateTime(), nullable=False),
    sa.Column('end_date', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['changed_by_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('holiday_request')
    # ### end Alembic commands ###
