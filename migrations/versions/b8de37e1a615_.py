"""empty message

Revision ID: b8de37e1a615
Revises: 
Create Date: 2018-04-22 20:09:02.672323

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b8de37e1a615'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Properties', sa.Column('is_public', sa.Boolean(), nullable=True))
    op.add_column('Properties', sa.Column('status', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Properties', 'status')
    op.drop_column('Properties', 'is_public')
    # ### end Alembic commands ###