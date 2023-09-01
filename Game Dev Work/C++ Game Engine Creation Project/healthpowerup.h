/*
Student Number: W20003739
Purpose of this file: Creates a game object that will be used to increase the player character's health when collided with in the game
*/

#pragma once
#include "gameobject.h"

class HealthPowerUp : public GameObject
{
private:
	Circle2D collisionShape;
	int timeoutCountdown;
public:
	HealthPowerUp();
	~HealthPowerUp();
	void Update(double frameTime);
	void Initialise(Vector2D initPos, float initAngle);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
};