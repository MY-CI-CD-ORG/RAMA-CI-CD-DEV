# Generated by Django 2.1 on 2018-09-08 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_auto_20180907_2327'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communitypartner',
            name='weitz_cec_part',
            field=models.CharField(choices=[('True', 'Yes'), ('False', 'No')], default=False, max_length=6),
        ),
    ]
