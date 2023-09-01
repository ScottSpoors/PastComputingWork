/*
Student Number: W20003739
Purpose of this file: Creates a concrete animated game object class that produces an explosion effect to be used by other objects
*/

#pragma once
#include "animatedgameobject.h"

class Explosion : public AnimatedGameObject

{
private:
	SoundIndex explosionSound;
	bool shouldAnimate;
	Circle2D collisionShape;
	int frameTimer;
	std::vector<PictureIndex> images;
	int currentImage;
public:
	Explosion();
	~Explosion();
	void Update(double frameTime);
	void Initialise(Vector2D initPos, float initAngle);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
	void LoadAnimationFrames();
};