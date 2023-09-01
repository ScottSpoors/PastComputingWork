/*
Student Number: W20003739
Purpose of this file: Provides code for the functions of the bullet object to make it move and for it to be deactivated if it collides
with any gameobject other than the player ship, or when enough time has elapsed since the bullet object was created
*/

#include "bullet.h"
#include "spaceship.h"
#include "rock.h"
#include "levelmanager.h"

Bullet::Bullet()
{
	active = false;
}

Bullet::~Bullet()
{
}

void Bullet::Initialise(Vector2D initPos, float initAngle)
{
	image = LoadImage(L"plasma.bmp");
	position = initPos;
	transparency = 0.5f;
	scale = 0.5f;
	angle = initAngle;
	bulletTimer = 0;
	active = true;
}

void Bullet::Update(double frameTime)
{
	if (active)
	{
		bulletTimer++;
		if (bulletTimer >= 120)
		{
			Deactivate();
		}
		Vector2D acceleration;
		acceleration.setBearing(angle, 5000.0f);
		velocity += acceleration * frameTime;
		position += velocity * frameTime;
	}
}

IShape2D& Bullet::GetShape()
{
	collisionShape.PlaceAt(position, 4);
	return collisionShape;
}

void Bullet::HandleCollision(GameObject& other)
{
	if (typeid(other) == typeid(Spaceship)||typeid(other)==typeid(LevelManager))
	{
	}
	else 
	{
		active = false;
	}
	
}