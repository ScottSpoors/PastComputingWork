/*
Student Number: W20003739
Purpose of this file: Creates a child object of the Bullet class for the enemy ship objects to fire during the game
*/

#pragma once
#include "bullet.h"

class EnemyBullet : public Bullet
{
private:
	Vector2D velocity;
	float direction;
	int parent;
	int bulletTimer;

	const Vector2D acceleration;
	Circle2D collisionShape;
public:
	EnemyBullet();
	~EnemyBullet();
	void Initialise(Vector2D initPos, float initAngle);
	void Update(double frameTime);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
};