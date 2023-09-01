/*
Student Number: W20003739
Purpose of this file: Handles the creation of the player character at the start of the game as well as the asteroids and enemy ships within intervals and quantities established by the specific level the game is currently on
Handles the switching between the various in game levels, altering the number of enemies and asteroids that will spawn based on the current level
*/

#include "levelmanager.h"
#include "enemyship.h"
#include "spaceship.h"
#include "rock.h"

LevelManager::LevelManager(ObjectManager* om)
{
	pOM = om;
	active = true;
}

void LevelManager::StartNextLevel()
{
	levelNumber++;
	levelCountdown = 300;
	enemiesCurrentlyInLevel = 0;
	enemiesSpawnedTotal = 0;
	rocksCurrentlyInLevel = 0;
	rocksSpawnedTotal = 0;
	enemySpawnTimer = 300;
	rockSpawnTimer = 0;

	if (levelNumber < 1)levelNumber = 1;
	if (levelNumber > 3)levelNumber = 3;

	if (levelNumber == 1)
	{
		maxEnemySpawn = 5;
		maxRockSpawn = 10;
	}
	if (levelNumber == 2)
	{
		maxEnemySpawn = 10;
		maxRockSpawn = 20;
	}
	if (levelNumber == 3)
	{
		maxEnemySpawn = 20;
		maxRockSpawn = 25;
	}
}

void LevelManager::Update(double frameTime)
{
	int size = pOM->ListSize();
	MyInputs* pInputs = MyInputs::GetInstance();
	pInputs->SampleKeyboard();
	if (((enemiesSpawnedTotal == maxEnemySpawn) && (size<=2))&&((rocksSpawnedTotal == maxRockSpawn)))
	{
		if (levelCountdown == 0)StartNextLevel();
		else
		{
			MyDrawEngine::GetInstance()->WriteText(Vector2D(0, 750), L"Next Level Start", MyDrawEngine::LIGHTGREEN);
			levelCountdown--;
		}
	}
	if (pInputs->KeyPressed(DIK_G))
	{
		StartNextLevel();
	}
	if (enemiesSpawnedTotal >= maxEnemySpawn)shouldSpawnEnemy = false;
	else if (enemySpawnTimer <= 0)shouldSpawnEnemy = true;
	else
	{
		shouldSpawnEnemy = false;
		enemySpawnTimer--;
	}

	if (rocksSpawnedTotal >= maxRockSpawn)shouldSpawnRock = false;
	else if (rockSpawnTimer <= 0)shouldSpawnRock = true;
	else
	{
		shouldSpawnRock = false;
		rockSpawnTimer--;
	}

	if (shouldSpawnEnemy)
	{
		int xrange = 1800;
		int yrange = 1000;

		Vector2D initEnemyPos(-xrange+(std::rand()%(xrange-(-xrange+1))), -yrange+(rand()%(yrange-(-yrange + 1))));
		GameObject* pEnemy = new EnemyShip(pOM,pShip);
		pEnemy->Initialise(initEnemyPos, (0+(rand()%(360-0+1))) / 57.3f);
		pOM->AddObject(pEnemy); 
		enemiesSpawnedTotal++;
		enemiesCurrentlyInLevel++;
		enemySpawnTimer = 300;
	}

	if (shouldSpawnRock)
	{
		int xrange = 1800;
		int yrange = 1000;

		Vector2D initRockPos(-xrange + (std::rand() % (xrange - (-xrange + 1))), -yrange + (rand() % (yrange - (-yrange + 1))));
		GameObject* pRock = new Rock();
		pRock->Initialise(initRockPos, 0.0f / 57.3f);
		pOM->AddObject(pRock);
		rocksSpawnedTotal++;
		rocksCurrentlyInLevel++;
		rockSpawnTimer = 200;
	}

	if (levelNumber == 1)
	{
		MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 750), L"Level 1", MyDrawEngine::LIGHTGREEN);
	}
	else if (levelNumber == 2)
	{
		MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 750), L"Level 2", MyDrawEngine::LIGHTGREEN);
	}
	else if (levelNumber == 3)
	{
		MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 750), L"Level 3", MyDrawEngine::LIGHTGREEN);
	}
	MyDrawEngine::GetInstance()->WriteText(Vector2D(-1250, 700), L"Score: " + score, MyDrawEngine::LIGHTGREEN);
}

void LevelManager::Initialise(Vector2D initPos, float initAngle)
{
	Vector2D initShipPos(0, 0);
	image = LoadImage(L"invisible.bmp");
	levelNumber = 0;
	srand(time(NULL));
	StartNextLevel();
	position = initPos;
	transparency = 0.0f;
	scale = 2.5f;
	pShip = new Spaceship(pOM);
	pShip->Initialise(initShipPos, 0.0f);
	pOM->AddObject(pShip);
	
}

IShape2D& LevelManager::GetShape()
{
	return collisionShape;
}

void LevelManager::HandleCollision(GameObject& other)
{
}

void LevelManager::AddScore(int scoreToAdd)
{
	score += scoreToAdd;
}

void LevelManager::EnemyDead()
{
	AddScore(100);
	enemiesCurrentlyInLevel--;
}

void LevelManager::RockDestroyed()
{
	AddScore(50);
	rocksCurrentlyInLevel--;
}

void LevelManager::PlayerDead()
{
}


LevelManager::~LevelManager()
{
}
