/*
Student Number: W20003739
Purpose of this file: Loads all required images and handles the animation of the explosion object, with the object being deactivated once the animation has completed
*/

#include "explosion.h"

Explosion::Explosion()
{
	active = false;
}

Explosion::~Explosion()
{
}

void Explosion::Initialise(Vector2D initPos, float initAngle)
{
	shouldAnimate = true;
	frameTimer = 0;
	AddImage(L"explosion1.bmp");
	SetCurrentImage(0);
	LoadAnimationFrames();
	position = initPos;
	scale = 5.0;
	active = true;
}

void Explosion::Update(double frameTime)
{
	if (frameTimer <= 0)
	{
		shouldAnimate = true;
	}
	else
	{
		frameTimer--;
		shouldAnimate = false;
	}

	if (shouldAnimate)
	{
		if (currentImage < 7)
		{
			SetCurrentImage(currentImage+1);
			currentImage++;
			frameTimer = 8;
		}
		
		else
		{
			active = false;
		}
	}
}


IShape2D& Explosion::GetShape()
{
	return collisionShape;
}

void Explosion::HandleCollision(GameObject& other)
{
}

void Explosion::LoadAnimationFrames()
{
	
	
	(L"explosion2.bmp");
	AddImage(L"explosion3.bmp");
	AddImage(L"explosion4.bmp");
	AddImage(L"explosion5.bmp");
	AddImage(L"explosion6.bmp");
	AddImage(L"explosion7.bmp");
	AddImage(L"explosion8.bmp");
}
