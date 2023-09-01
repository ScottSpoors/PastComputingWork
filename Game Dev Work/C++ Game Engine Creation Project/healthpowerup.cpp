/*
Student Number: W20003739
Purpose of this file: Adds code to initialise the health power-up as well as to deactivate the object if it collides with the player character
or after a long enough interval of time has passed between since the object was created in the game
*/

#include "healthpowerup.h"
#include "spaceship.h"

HealthPowerUp::HealthPowerUp()
{
	active = false;
}

HealthPowerUp::~HealthPowerUp()
{
}

void HealthPowerUp::Update(double frameTime)
{
	if (timeoutCountdown <= 0)
	{
		active = false;
	}
	else
	{
		timeoutCountdown--;
	}
}

void HealthPowerUp::Initialise(Vector2D initPos, float initAngle)
{
	image = LoadImage(L"health-powerup.bmp");
	position = initPos;
	transparency = 0.0f;
	scale = 0.5f;
	angle = initAngle;
	active = true;
	timeoutCountdown = 600;
}

IShape2D& HealthPowerUp::GetShape()
{
	collisionShape.PlaceAt(position, 64);
	return collisionShape;
}

void HealthPowerUp::HandleCollision(GameObject& other)
{
	if (typeid(other) == typeid(Spaceship))
	{
		active = false;
	}
}
