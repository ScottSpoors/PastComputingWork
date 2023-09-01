/*
Student Number: W20003739
Purpose of this file: Creates an asteroid game object
*/

#pragma once
#include "gametimer.h"
#include "gameobject.h"

class Rock: public GameObject
{
private:
	Vector2D velocity;
	float direction;
	Circle2D collisionShape;
public:
	Rock();
	~Rock();
	void Initialise(Vector2D initPos, float initAngle);
	void Update(double frameTime);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
};