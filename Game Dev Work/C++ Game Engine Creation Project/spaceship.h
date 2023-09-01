/*
Student Number: W20003739
Purpose of this file: Creates a spaceship animated game object to be controlled by the player during the game
*/

#pragma once
#include "myinputs.h"
#include "gametimer.h"
#include "animatedgameobject.h"
#include "objectmanager.h"

class Spaceship: public AnimatedGameObject
{
private:
	Vector2D velocity;
	float direction;

	SoundIndex shootSound;
	SoundIndex thrustSound;

	const Vector2D acceleration;

	ObjectManager* pOM;

	bool canShoot;
	bool shouldAnimate;

	int frameCount;
	enum states{green, yellow, red, greenToYellow, yellowToRed, redToYellow, yellowToGreen};
	states currentState;
	
	int shootTimer;
	Circle2D collisionShape;

	std::vector<PictureIndex> images;
	int currentImage;

	int health;

	int invincibleFrames;
	bool isInvincible;

	int respawnCountdown;
	bool isDead;


	int playerLives;

public:
	Spaceship(ObjectManager* om);
	~Spaceship();
	void Initialise(Vector2D initPos, float initAngle);
	void Update(double frameTime);
	IShape2D& GetShape();
	
	void HandleCollision(GameObject& other);
	void LoadAnimationFrames();
	void MakeExplosion();
};