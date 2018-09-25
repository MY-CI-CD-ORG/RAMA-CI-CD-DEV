# Generated by Django 2.1.1 on 2018-09-25 05:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CampusPartner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('campus_partner_name', models.CharField(max_length=255)),
                ('weitz_cec_part', models.CharField(choices=[('True', 'Yes'), ('False', 'No')], default=False, max_length=6)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='CampusPartnerUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='CommunityPartner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CommunityPartnerName', models.CharField(max_length=100)),
                ('website_url', models.URLField(blank=True, max_length=100)),
                ('k12_level', models.CharField(blank=True, max_length=20)),
                ('other', models.CharField(blank=True, max_length=20, null=True)),
                ('address_line1', models.CharField(blank=True, max_length=1024)),
                ('address_line2', models.CharField(blank=True, max_length=1024)),
                ('country', models.CharField(blank=True, max_length=100)),
                ('city', models.CharField(blank=True, max_length=25)),
                ('state', models.CharField(blank=True, max_length=15)),
                ('Zip', models.CharField(blank=True, max_length=10)),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('active', models.BooleanField(default=True)),
                ('weitz_cec_part', models.CharField(choices=[('True', 'Yes'), ('False', 'No')], default=False, max_length=6)),
            ],
        ),
        migrations.CreateModel(
            name='CommunityPartnerUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='CommunityType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('community_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prefix', models.CharField(max_length=80)),
                ('number', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='University',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('college', models.CharField(max_length=50)),
                ('department', models.CharField(max_length=30)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
    ]
