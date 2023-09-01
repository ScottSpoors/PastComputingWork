/*
Student Number: W20003739
Purpose of this file: Creates a class for the bullet object that will be fired by the player character
*/

#pragma once
#include "mydrawengine.h"
#include "mysoundengine.h"
#include "myinputs.h"
#include "gametimer.h"
#include "gameobject.h"



class Bullet: public GameObject
{
private:
	Vector2D velocity;
	float direction;
	int bulletTimer;

	const Vector2D acceleration;
	Circle2D collisionShape;
public:
	Bullet();
	~Bullet();
	void Initialise(Vector2D initPos, float initAngle);
	void Update(double frameTime);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
};