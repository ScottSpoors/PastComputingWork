/*
Student Number: W20003739
Purpose of this file: adds all of the code for the functions of the player character, including movement, sound effects, animation for when the player health value changes
as well as handling player death in game and the creation of bullet objects when the player presses one of the fire keys or an explosion when the player dies
*/

#include "spaceship.h"
#include "bullet.h"
#include "rock.h"
#include "healthpowerup.h"
#include "explosion.h"
#include "enemybullet.h"
#define _CRT_SECURE_NO_WARNINGS

Spaceship::Spaceship(ObjectManager* om)
{
	active = false;
	pOM = om;
}

Spaceship::~Spaceship()
{
}

void Spaceship::Initialise(Vector2D initPos, float initAngle)
{
	position = initPos;
	image = LoadImage(L"ship-green.bmp");
	currentState = green;
	LoadAnimationFrames();
	frameCount = 1;

	transparency = 0.0f;
	scale = 5.0f;
	angle = 0.0f;

	invincibleFrames = 0;
	isInvincible = false;
	
	MySoundEngine* pSE = MySoundEngine::GetInstance();
	shootSound = LoadSound(L"shot.wav");
	thrustSound = LoadSound(L"thrustloop2.wav");
	pSE->SetVolume(thrustSound, -3000);
	shootTimer = 0;
	active = true;
	health = 3;
	respawnCountdown = 600;
	isDead = false;
	playerLives = 5;
}



void Spaceship::Update(double frameTime)
{
	if (active)
	{
		if (playerLives == 0)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 0", MyDrawEngine::LIGHTGREEN);
		else if (playerLives == 1)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 1", MyDrawEngine::LIGHTGREEN);
		else if (playerLives == 1)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 2", MyDrawEngine::LIGHTGREEN);
		else if (playerLives == 1)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 3", MyDrawEngine::LIGHTGREEN);
		else if (playerLives == 1)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 4", MyDrawEngine::LIGHTGREEN);
		else if (playerLives == 1)MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 650), L"Player Lives: 5", MyDrawEngine::LIGHTGREEN);
		if (position.XValue >= 1800)
		{
			position.XValue = -1800;
		}
		else if (position.XValue <= -1800)
		{
			position.XValue = 1800;
		}
		if (position.YValue >= 1000)
		{
			position.YValue = -1000;
		}
		else if (position.YValue <= -1000)
		{
			position.YValue = 1000;
		}
		if (currentState == green)
		{
			SetCurrentImage(0);
		}
		else if (currentState == yellow)
		{
			SetCurrentImage(25);
		}
		else if (currentState == red)
		{
			SetCurrentImage(50);
		}
		else if (currentState == greenToYellow)
		{
			if (!shouldAnimate)
			{
				currentState = yellow;
			}
			else
			{
				SetCurrentImage(frameCount);
			}
		}
		else if (currentState == yellowToRed)
		{
			if (!shouldAnimate)
			{
				currentState = red;
			}
			else
			{
				SetCurrentImage(frameCount + 25);
			}
		}
		else if (currentState == redToYellow)
		{
			if (!shouldAnimate)
			{
				currentState = yellow;
			}
			else
			{

				SetCurrentImage(50 - frameCount);
			}
		}
		else if (currentState == yellowToGreen)
		{
			if (!shouldAnimate)
			{
				currentState = green;
			}
			else
			{
				SetCurrentImage(25 - frameCount);
			}
		}
		const double newAngle = (150 / 57.3) * frameTime;

		Vector2D friction = -0.5 * velocity;
		velocity += friction * frameTime;

		MySoundEngine* pSE = MySoundEngine::GetInstance();
		MyInputs* pInputs = MyInputs::GetInstance();
		pInputs->SampleKeyboard();

		if (shootTimer <= 0)
		{
			canShoot = true;
		}
		else
		{
			canShoot = false;
			shootTimer--;
		}

		if (shouldAnimate == true)
		{
			if (frameCount < 25)
			{
				shouldAnimate = true;
				frameCount++;
			}
			else
			{
				shouldAnimate = false;
				frameCount = 1;
			}
		}

		if (invincibleFrames <= 0)
		{
			isInvincible = false;
			transparency = 0.0f;
		}
		else
		{
			isInvincible = true;
			transparency = 0.5f;
			invincibleFrames--;
		}

		if (isDead)
		{
			transparency = 1.0;
			respawnCountdown--;
			velocity = Vector2D(0, 0);
			position = Vector2D(0, 0);
		}

		if (respawnCountdown <= 0)
		{
			if (playerLives > 0)
			{
				isDead = false;
				transparency = 0.0;
				respawnCountdown = 600;
			}
			else
			{
				isDead = true;
				MyDrawEngine::GetInstance()->WriteText(Vector2D(0, 0), L"GAME OVER", MyDrawEngine::LIGHTGREEN);
				active = false;
			}
		}

		if (!isDead)
		{
			if (pInputs->KeyPressed(DIK_W))
			{
				Vector2D acceleration;
				acceleration.setBearing(angle, 500.0f);
				velocity += acceleration * frameTime;
				pSE->Play(thrustSound, true);
			}
			else if (!(pInputs->KeyPressed(DIK_S)) && !(pInputs->KeyPressed(DIK_LEFT)) && !(pInputs->KeyPressed(DIK_RIGHT)))
			{
				pSE->Stop(thrustSound);
			}
			if (pInputs->KeyPressed(DIK_S))
			{
				Vector2D acceleration;
				acceleration.setBearing(angle, 50.0f);
				velocity -= acceleration * frameTime;
				pSE->Play(thrustSound, true);
			}
			if (pInputs->KeyPressed(DIK_LEFT))
			{
				if (canShoot)
				{
					Bullet* pBullet = new Bullet();
					pBullet->Initialise(position, angle - (90 / 57.3));
					pOM->AddObject(pBullet);
					pSE->Play(shootSound);
					canShoot = false;
					shootTimer = 30;
				}
			}
			if (pInputs->KeyPressed(DIK_RIGHT))
			{
				if (canShoot)
				{
					Bullet* pBullet = new Bullet();
					pBullet->Initialise(position, angle + (90 / 57.3));
					pOM->AddObject(pBullet);
					pSE->Play(shootSound);
					canShoot = false;
					shootTimer = 30;
				}
			}
			if (pInputs->KeyPressed(DIK_UP))
			{
				if (canShoot)
				{
					Bullet* pBullet = new Bullet();
					pBullet->Initialise(position, angle);
					pOM->AddObject(pBullet);
					pSE->Play(shootSound);
					canShoot = false;
					shootTimer = 30;
				}
			}
			if (pInputs->KeyPressed(DIK_DOWN))
			{
				if (canShoot)
				{
					Bullet* pBullet = new Bullet();
					pBullet->Initialise(position, angle + (180 / 57.3));
					pOM->AddObject(pBullet);
					pSE->Play(shootSound);
					canShoot = false;
					shootTimer = 30;
				}
			}
			if (pInputs->KeyPressed(DIK_A))
			{
				angle -= newAngle;
			}
			if (pInputs->KeyPressed(DIK_D))
			{
				angle += newAngle;
			}

			if (pInputs->KeyPressed(DIK_O))
			{
				scale -= 0.01f;
			}
			if (pInputs->KeyPressed(DIK_P))
			{
				scale += 0.01f;
			}
			if (pInputs->KeyPressed(DIK_K))
			{
				shouldAnimate = true;
				if (currentState == green)currentState = greenToYellow;
				else if (currentState == yellow)currentState = yellowToRed;
			}
			if (pInputs->KeyPressed(DIK_L))
			{
				shouldAnimate = true;
				if (currentState == red)currentState = redToYellow;
				else if (currentState == yellow)currentState = yellowToGreen;
			}
			position += velocity * frameTime;
		}
		
		if (health < 1)
		{
			isDead = true;
			MakeExplosion();
		}
	}
}

IShape2D& Spaceship::GetShape()
{
	collisionShape.PlaceAt(position, 32);
	return collisionShape;
}





void Spaceship::HandleCollision(GameObject& other)
{
	if (typeid(other) == typeid(Rock))
	{
		transparency = 1.0f;
		MakeExplosion();
	}
	if (typeid(other) == typeid(EnemyBullet))
	{
		if (!isInvincible)
		{
			health--;
			if (health == 2)
			{
				shouldAnimate = true;
				currentState = greenToYellow;
			}
			if (health == 1)
			{
				shouldAnimate = true;
				currentState = yellowToRed;
			}
			isInvincible = true;
			invincibleFrames = 300;
		}
	}
	else if (typeid(other) == typeid(HealthPowerUp))
	{
		if (health < 3 && health >0)
		{
			health++;
			if (health == 2)
			{
				shouldAnimate = true;
				currentState = redToYellow;
			}
			else if (health == 3)
			{
				shouldAnimate = true;
				currentState = yellowToGreen;
			}
		}
	}
}

void Spaceship::LoadAnimationFrames()
{
	AddImage(L"ship-gty-1.bmp");
	AddImage(L"ship-gty-2.bmp");
	AddImage(L"ship-gty-3.bmp");
	AddImage(L"ship-gty-4.bmp");
	AddImage(L"ship-gty-5.bmp");
	AddImage(L"ship-gty-6.bmp");
	AddImage(L"ship-gty-7.bmp");
	AddImage(L"ship-gty-8.bmp");
	AddImage(L"ship-gty-9.bmp");
	AddImage(L"ship-gty-10.bmp");
	AddImage(L"ship-gty-11.bmp");
	AddImage(L"ship-gty-12.bmp");
	AddImage(L"ship-gty-13.bmp");
	AddImage(L"ship-gty-14.bmp");
	AddImage(L"ship-gty-15.bmp");
	AddImage(L"ship-gty-16.bmp");
	AddImage(L"ship-gty-17.bmp");
	AddImage(L"ship-gty-18.bmp");
	AddImage(L"ship-gty-19.bmp");
	AddImage(L"ship-gty-20.bmp");
	AddImage(L"ship-gty-21.bmp");
	AddImage(L"ship-gty-22.bmp");
	AddImage(L"ship-gty-23.bmp");
	AddImage(L"ship-gty-24.bmp");

	AddImage(L"ship-yellow.bmp");

	AddImage(L"ship-ytr-1.bmp");
	AddImage(L"ship-ytr-2.bmp");
	AddImage(L"ship-ytr-3.bmp");
	AddImage(L"ship-ytr-4.bmp");
	AddImage(L"ship-ytr-5.bmp");
	AddImage(L"ship-ytr-6.bmp");
	AddImage(L"ship-ytr-7.bmp");
	AddImage(L"ship-ytr-8.bmp");
	AddImage(L"ship-ytr-9.bmp");
	AddImage(L"ship-ytr-10.bmp");
	AddImage(L"ship-ytr-11.bmp");
	AddImage(L"ship-ytr-12.bmp");
	AddImage(L"ship-ytr-13.bmp");
	AddImage(L"ship-ytr-14.bmp");
	AddImage(L"ship-ytr-15.bmp");
	AddImage(L"ship-ytr-16.bmp");
	AddImage(L"ship-ytr-17.bmp");
	AddImage(L"ship-ytr-18.bmp");
	AddImage(L"ship-ytr-19.bmp");
	AddImage(L"ship-ytr-20.bmp");
	AddImage(L"ship-ytr-21.bmp");
	AddImage(L"ship-ytr-22.bmp");
	AddImage(L"ship-ytr-23.bmp");
	AddImage(L"ship-ytr-24.bmp");

	AddImage(L"ship-red.bmp");
}

void Spaceship::MakeExplosion()
{
	Explosion* pExplosion = new Explosion();
	pExplosion->Initialise(position, angle);
	pOM->AddObject(pExplosion);
}
