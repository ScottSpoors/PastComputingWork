/*
Student Number: W20003739
Purpose of this file: Creates an abstract class for all other game objects to inherit from to allow for polymorphism 
*/

#pragma once
#include "vector2D.h"
#include "mydrawengine.h"
#include "mysoundengine.h"
#include "Shapes.h"
#include <typeinfo>

class GameObject
{
protected:
	Vector2D position;
	float angle;
	bool active;
	virtual PictureIndex LoadImage(const wchar_t* image);
	SoundIndex LoadSound(const wchar_t* sound);
	PictureIndex image;
	float scale;
	float transparency;
private:
	

public:
	GameObject();
	virtual ~GameObject();
	void Render();
	virtual void Update(double frameTime) =0;
	bool IsActive() const;
	void Deactivate();
	Vector2D returnLocation();
	virtual void Initialise(Vector2D initPos, float initAngle)=0;
	virtual IShape2D& GetShape() = 0;
	virtual void HandleCollision(GameObject& other) = 0;
};