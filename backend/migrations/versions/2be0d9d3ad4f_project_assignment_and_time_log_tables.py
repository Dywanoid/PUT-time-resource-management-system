"""Project assignment and time log tables

Revision ID: 2be0d9d3ad4f
Revises: 4c08e2ba93cb
Create Date: 2021-05-23 00:51:46.056734

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = '2be0d9d3ad4f'
down_revision = '4c08e2ba93cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('project_assignment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('begin_date', sa.Date(), nullable=False),
    sa.Column('end_date', sa.Date(), nullable=False),
    sa.Column('hourly_rate', sa.Numeric(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_project_assignment_begin_date'), 'project_assignment', ['begin_date'], unique=False)
    op.create_index(op.f('ix_project_assignment_end_date'), 'project_assignment', ['end_date'], unique=False)
    op.create_table('time_log',
    sa.Column('project_assignment_id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('duration', sa.Interval(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['project_assignment_id'], ['project_assignment.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.PrimaryKeyConstraint('project_assignment_id', 'task_id', 'date')
    )
    op.create_index(op.f('ix_time_log_date'), 'time_log', ['date'], unique=False)
    currency = postgresql.ENUM('EUR', 'USD', 'PLN', name='currency')
    currency.create(op.get_bind())
    op.add_column('client', sa.Column('currency', sa.Enum('EUR', 'USD', 'PLN', name='currency'), nullable=False, server_default='PLN'))
    op.alter_column('client', 'currency', server_default=None)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('client', 'currency')
    currency = postgresql.ENUM('EUR', 'USD', 'PLN', name='currency')
    currency.drop(op.get_bind())
    op.drop_index(op.f('ix_time_log_date'), table_name='time_log')
    op.drop_table('time_log')
    op.drop_index(op.f('ix_project_assignment_end_date'), table_name='project_assignment')
    op.drop_index(op.f('ix_project_assignment_begin_date'), table_name='project_assignment')
    op.drop_table('project_assignment')
    # ### end Alembic commands ###