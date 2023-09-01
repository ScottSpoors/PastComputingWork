/*
Student Number: W20003739
Purpose of this file: This is much the same as its parent bullet class, however with the collision parameters changed to ignore collision with the enemy ship object rather than the player ship
*/

#include "enemybullet.h"
#include "enemyship.h"
#include "spaceship.h"

EnemyBullet::EnemyBullet()
{
}

EnemyBullet::~EnemyBullet()
{
}

void EnemyBullet::Initialise(Vector2D initPos, float initAngle)
{
	image = LoadImage(L"enemy-bullet.bmp");
	position = initPos;
	transparency = 0.5f;
	scale = 2.5f;
	angle = initAngle;
	bulletTimer = 0;
	active = true;
}

void EnemyBullet::Update(double frameTime)
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

IShape2D& EnemyBullet::GetShape()
{
	collisionShape.PlaceAt(position, 16.0f);
	return collisionShape;
}

void EnemyBullet::HandleCollision(GameObject& other)
{
	if(typeid(other) == typeid(EnemyShip))
	{
	}
	else
	{
		active = false;
	}
}
