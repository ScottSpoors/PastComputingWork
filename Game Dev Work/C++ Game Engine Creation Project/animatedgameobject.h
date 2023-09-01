/*
Student Number: W20003739
Purpose of this file: Provides an abstract class for game objects to inherit from that require animation in their object images
*/

#pragma once
#include "gameobject.h"
#include <vector>
#include <string>
#define _CRT_SECURE_NO_WARNINGS

class AnimatedGameObject : public GameObject
{
private:
	std::vector<PictureIndex> images;
	int currentImage;
public:
	void SetCurrentImage(int index);
	void AddImage(const wchar_t* image);
	PictureIndex LoadImage(const wchar_t* image) override;
};