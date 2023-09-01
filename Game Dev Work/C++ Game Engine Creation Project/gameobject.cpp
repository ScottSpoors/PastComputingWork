/*
Student Number: W20003739
Purpose of this file: Provides template code for the inheritable functions usable by all game objects
*/

#include "gameobject.h"

PictureIndex GameObject::LoadImage(const wchar_t* image)
{
	MyDrawEngine* pDE = MyDrawEngine::GetInstance();
	return pDE->LoadPicture(image);
}

SoundIndex GameObject::LoadSound(const wchar_t* sound)
{
	MySoundEngine* pSE = MySoundEngine::GetInstance();
	return pSE->LoadWav(sound);
}


GameObject::GameObject()
{
	scale = 1.0f;
	transparency = 0.0f;
}

GameObject::~GameObject()
{
}

void GameObject::Render()
{
	if (active)
	{
		MyDrawEngine* pDE = MyDrawEngine::GetInstance();
		pDE->DrawAt(position, image, scale, angle, transparency);
	}
}

bool GameObject::IsActive() const
{
	return active;
}

void GameObject::Deactivate()
{
	active = false;
}


Vector2D GameObject::returnLocation()
{
	return position;
}