/*
Student Number: W20003739
Purpose of this file: Handles a list of all game objects currently active in the game, updating and rendering each in turn as well as removing inactive objects from this list
Also checks each object in the list against each other object to see if they are currently colliding, and informs these objects to handle this collision if this is the case
*/

#include "objectmanager.h"
#include "bullet.h"
#include "spaceship.h"
#include "rock.h"
#include <iterator>

ObjectManager::ObjectManager()
{
}

ObjectManager::~ObjectManager()
{
	DeleteAllObjects();
}

void ObjectManager::AddObject(GameObject* pNewObject)
{
	pObjectList.push_back(pNewObject);
}

void ObjectManager::UpdateAll(double frameTime)
{
	for (GameObject* pNext : pObjectList)
	{
		pNext->Update(frameTime);
	}
}

void ObjectManager::RenderAll()
{
	for (GameObject* pNext : pObjectList)
	{
		if(pNext -> IsActive())
			pNext->Render();
	}
}

void ObjectManager::DeleteAllObjects()
{
	for (GameObject* pNext : pObjectList)
	{
		delete pNext;
		pNext = nullptr;
	}
	pObjectList.clear();
}

void ObjectManager::DeleteInactiveObjects()
{
	for (GameObject*& pNext : pObjectList)
	{
		if (!pNext->IsActive())
		{
			delete pNext;
			pNext = nullptr;
		}
	}
	pObjectList.remove(nullptr);
}

int ObjectManager::ListSize()
{
	return pObjectList.size();
}

void ObjectManager::CheckAllCollisions()
{
	std::list<GameObject*>::iterator it1;
	std::list<GameObject*>::iterator it2;
	for (it1 = pObjectList.begin(); it1 != pObjectList.end(); it1++)
	{
		for (it2 = std::next(it1); it2 != pObjectList.end(); it2++)
		{
			if ((*it1)->GetShape().Intersects((*it2)->GetShape()))
			{
				(*it1)->HandleCollision((**it2));
				(*it2)->HandleCollision((**it1));
			}
		}
	}

}

