/*
Student Number: W20003739
Purpose of this file: Establishes/overwrites functions to allow child classes of AnimatedGameObject to load and store multiple images 
as well as switch between these images on the fly to give the impression of animation
*/

#include "animatedgameobject.h"

void AnimatedGameObject::SetCurrentImage(int index)
{
	if (index < 0)
		currentImage = 0;
	if (index >= images.size())
		currentImage = images.size() - 1;
	else
		currentImage = index;
	image = images[currentImage];

}

void AnimatedGameObject::AddImage(const wchar_t* image)
{
	PictureIndex temp = MyDrawEngine::GetInstance()->LoadPicture(image);
	images.push_back(temp);
}


PictureIndex AnimatedGameObject::LoadImage(const wchar_t* image)
{
	PictureIndex temp = MyDrawEngine::GetInstance()->LoadPicture(image);
	images.push_back(temp);
	return temp;
}
