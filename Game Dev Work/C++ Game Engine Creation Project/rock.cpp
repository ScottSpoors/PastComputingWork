/*
Student Number: W20003739
Purpose of this file: Adds the code for the functions used in the asteroid game object to make the object move forward at a random angle in the game and to randomly assign one of four possible images to each object instance
*/

#include "rock.h"
#include "bullet.h"

Rock::Rock()
{
	active = false;
}

Rock::~Rock()
{
}

void Rock::Initialise(Vector2D initPos, float initAngle)
{
	position = initPos;
	image = LoadImage(L"rock1.bmp");
	srand(time(NULL));
	int imageToLoad = 1 + (std::rand() % (4 - 1 + 1));
	if (imageToLoad == 1)image = LoadImage(L"rock1.bmp");
	else if (imageToLoad == 2)image = LoadImage(L"rock2.bmp");
	else if (imageToLoad == 3)image = LoadImage(L"rock3.bmp");
	else if (imageToLoad == 4)image = LoadImage(L"rock4.bmp");
	double randAngle = rand() % 360;
	randAngle /= 57.3;
	transparency = 0.0f;
	scale = 1.0f;
	angle = randAngle;
	active = true;
}

void Rock::Update(double frameTime)
{
	Vector2D friction = -0.5 * velocity;
	velocity += friction * frameTime;
	Vector2D acceleration;
	acceleration.setBearing(angle, 25.0f);
	velocity += acceleration * frameTime;
	position += velocity * frameTime;

	if (position.XValue >= 1800)position.XValue = -1800;
	else if (position.XValue <= -1800)position.XValue = 1800;
	if (position.YValue >= 1000)position.YValue = -1000;
	else if (position.YValue <= -1000)position.YValue = 1000;
}

IShape2D& Rock::GetShape()
{
	collisionShape.PlaceAt(position,64);
	return collisionShape;
}

void Rock::HandleCollision(GameObject& other)
{
	if (typeid(other) == typeid(Bullet))
	{
		active = false;
	}
}


