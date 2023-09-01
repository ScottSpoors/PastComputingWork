/*
Student Number: W20003739
Purpose of this file: Creates a concrete animated game object class to act as the enemy ships in the game
*/

#pragma once
#include "animatedgameobject.h"
#include "objectmanager.h"

class EnemyShip: public AnimatedGameObject
{
private:
	ObjectManager* pOm;
	Circle2D collisionShape;
	int health;
	std::vector<PictureIndex> images;
	int currentImage;
	int frameCount;
	int animationTimer;
	int shootTimer;
	bool playerClose;
	GameObject* player;
	bool canShoot;
	SoundIndex shootSound;
	bool shouldAnimate;
	Vector2D playerPosition;
public:
	EnemyShip(ObjectManager* om, GameObject* playerShip);
	void Initialise(Vector2D initPos, float initAngle);
	void Update(double frameTime);
	void HandleCollision(GameObject& other);
	IShape2D& GetShape();
	~EnemyShip();
};