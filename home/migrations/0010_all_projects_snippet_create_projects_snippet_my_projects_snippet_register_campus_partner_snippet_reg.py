# Generated by Django 2.1.1 on 2019-04-21 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0009_auto_20190403_1954'),
    ]

    operations = [
        migrations.CreateModel(
            name='All_Projects_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'All Projects Page Snippet',
            },
        ),
        migrations.CreateModel(
            name='Create_Projects_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'Create Projects Page Snippet',
            },
        ),
        migrations.CreateModel(
            name='My_Projects_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'My Projects Page Snippet',
            },
        ),
        migrations.CreateModel(
            name='Register_Campus_Partner_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'Register Campus Partner Snippet',
            },
        ),
        migrations.CreateModel(
            name='Register_Campus_Partner_User_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'Register Campus Partner User Snippet',
            },
        ),
        migrations.CreateModel(
            name='Register_Community_Partner_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'Register Community Partner Snippet',
            },
        ),
        migrations.CreateModel(
            name='Register_Community_Partner_User_Snippet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
                'verbose_name': 'Register Community Partner User Snippet',
            },
        ),
    ]
