"""empty message

Revision ID: 2ad82f7fdb5
Revises: 113f3f6f6ef
Create Date: 2015-03-06 12:36:32.414854

"""

# revision identifiers, used by Alembic.
revision = '2ad82f7fdb5'
down_revision = '113f3f6f6ef'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('task', sa.Column('assignedIds', sa.Integer(), nullable=True))
    op.add_column('task', sa.Column('description', sa.String(length=255), nullable=True))
    op.add_column('task', sa.Column('orderId', sa.Integer(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('task', 'orderId')
    op.drop_column('task', 'description')
    op.drop_column('task', 'assignedIds')
    ### end Alembic commands ###