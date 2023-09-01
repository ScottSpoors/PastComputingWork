/*
Student Number: W20003739
Purpose of this file: Creates a class that handles all game objects utilised within the game at any given time
*/

#pragma once
#include <list>
#include "gameobject.h"
class ObjectManager
{
private:
	std::list<GameObject*> pObjectList;

public:
	ObjectManager();
	~ObjectManager();
	void AddObject(GameObject* pNewObject);
	void UpdateAll(double frameTime);
	void RenderAll();
	void DeleteAllObjects();
	void DeleteInactiveObjects();
	int ListSize();
	void CheckAllCollisions();
};