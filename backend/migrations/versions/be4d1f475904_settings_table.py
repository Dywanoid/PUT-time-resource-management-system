"""Settings table

Revision ID: be4d1f475904
Revises: b8ed3117e868
Create Date: 2021-07-03 20:33:36.767122

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision = 'be4d1f475904'
down_revision = 'd4613ba8f4c2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    currency = postgresql.ENUM('EUR', 'USD', 'PLN', name='currency', create_type=False)

    settings = op.create_table('settings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('vendor_name', sa.String(), nullable=False),
    sa.Column('vendor_tax_id', sa.String(), nullable=True),
    sa.Column('vendor_street_with_number', sa.String(), nullable=True),
    sa.Column('vendor_zip_code', sa.String(), nullable=True),
    sa.Column('vendor_city', sa.String(), nullable=True),
    sa.Column('vendor_currency', currency, nullable=False),
    sa.Column('vendor_vat_rate', sa.Numeric(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    op.bulk_insert(settings, [
        {
            'id': 1,
            'vendor_name': 'Kowalski Software House Sp. z o.o.',
            'vendor_tax_id': 'PL5194429213',
            'vendor_street_with_number': 'Poznańska 1/1',
            'vendor_zip_code': '61-101',
            'vendor_city': 'Poznań',
            'vendor_currency': 'PLN',
            'vendor_vat_rate': 0.23
        }
    ])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('settings')
    # ### end Alembic commands ###
