"""empty message

Revision ID: 4baff5d1b5d
Revises: 2ad82f7fdb5
Create Date: 2015-03-06 21:49:21.599839

"""

# revision identifiers, used by Alembic.
revision = '4baff5d1b5d'
down_revision = '2ad82f7fdb5'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todo', sa.Column('status', sa.Text(), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('todo', 'status')
    ### end Alembic commands ###
