/*
Student Number: W20003739
Purpose of this file: Adds code to the functions of the enemy ship object to animate between two images as well as to track the position of the player ship 
and alter its rotation to face this ship and create enemy bullet objects with a randomised spread if the player ship is with close enough proximity
When the ship is destroyed also a random number generator is used to determine a random chance of if a health power up object should be created at the location of the enemy ship's destruction
*/

#include "enemyship.h"
#include "enemybullet.h"
#include "explosion.h"
#include "healthpowerup.h"

EnemyShip::EnemyShip(ObjectManager* om, GameObject* playerShip)
{
	pOm = om;
	player = playerShip;
}

void EnemyShip::Initialise(Vector2D initPos, float initAngle)
{
	position = initPos;
	AddImage(L"enemy-ship.bmp");
	SetCurrentImage(0);
	AddImage(L"enemy-ship-1.bmp");
	transparency = 0.0f;
	scale = 0.25f;
	angle = initAngle;
	srand(time(NULL));
	frameCount = 0;
	animationTimer = 12;
	shootTimer = 100;
	playerClose = false;
	shootSound = LoadSound(L"shot.wav");
	shouldAnimate = false;
	active = true;
}

void EnemyShip::Update(double frameTime)
{
	if (active)
	{
		playerPosition = player->returnLocation();
		float distanceX = playerPosition.XValue - position.XValue;
		float distanceY = playerPosition.YValue - position.YValue;
		Vector2D temp = Vector2D(distanceX, distanceY);
		float distance = temp.magnitude();
		if (distance <= 600)
		{
			playerClose = true;
		}
		else 
		{
			playerClose = false;
		}

		if (shootTimer <= 0 && playerClose)
		{
			canShoot = true;
		}
		else
		{
			canShoot = false;
			shootTimer--;
		}

		if (animationTimer <= 0)
		{
			shouldAnimate = true;
		}
		else
		{
			shouldAnimate = false;
			animationTimer--;
		}

		MySoundEngine* pSE = MySoundEngine::GetInstance();
		if (shouldAnimate)
		{
			if (frameCount != 1)frameCount = 1;
			else if (frameCount != 0)frameCount = 0;
			SetCurrentImage(frameCount);
			animationTimer = 12;
		}
		
		
		if (canShoot)
		{
			Bullet* pBullet = new EnemyBullet();
			pBullet->Initialise(position, angle + (-10 + (std::rand() % (10 - (-10) + 1))));
			pOm->AddObject(pBullet);
			pSE->Play(shootSound);
			canShoot = false;
			shootTimer = 60;
		}
		if (playerClose)
		{
			angle = atan((playerPosition.XValue - position.XValue) / (playerPosition.YValue - position.YValue));
		}
	}
}

void EnemyShip::HandleCollision(GameObject& other)
{
	if (typeid(other) == typeid(Bullet))
	{
		Explosion* pExplosion = new Explosion();
		pExplosion->Initialise(position, angle);
		pOm->AddObject(pExplosion);
		int healthSpawnChance = 1 + (std::rand() % (5 - 1 + 1));
		if (healthSpawnChance == 5)
		{
			HealthPowerUp* pHealth = new HealthPowerUp();
			pHealth->Initialise(position, 0.0f);
			pOm->AddObject(pHealth);
		}
		active = false;
	}
}

IShape2D& EnemyShip::GetShape()
{
	collisionShape.PlaceAt(position, 250);
	return collisionShape;
}

EnemyShip::~EnemyShip()
{
}
