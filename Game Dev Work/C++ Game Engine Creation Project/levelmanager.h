/*
Student Number: W20003739
Purpose of this file: Creates a class that manages the current level of the game and the progression through the levels during runtime
*/

#pragma once
#include "animatedgameobject.h"
#include "objectmanager.h"

class LevelManager: public AnimatedGameObject
{
private:
	int levelNumber;
	int score;
	int enemySpawnTimer;
	int rockSpawnTimer;
	int maxEnemySpawn;
	int maxRockSpawn;
	int enemiesCurrentlyInLevel;
	int enemiesSpawnedTotal;
	int rocksCurrentlyInLevel;
	int rocksSpawnedTotal;
	Circle2D collisionShape;
	int levelCountdown;
	ObjectManager* pOM;
	bool shouldSpawnEnemy;
	bool shouldSpawnRock;
	GameObject* pShip;
	std::vector<PictureIndex> images;
	int currentImage;

public:
	LevelManager(ObjectManager* om);
	void StartNextLevel();
	void Update(double frameTime);
	void Initialise(Vector2D initPos, float initAngle);
	IShape2D& GetShape();
	void HandleCollision(GameObject& other);
	void AddScore(int scoreToAdd);
	void EnemyDead();
	void RockDestroyed();
	void PlayerDead();
	~LevelManager();
};