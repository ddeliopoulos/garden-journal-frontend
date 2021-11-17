import {RouteParamValue} from "vue-router";
import router from "@/router";

import {getAuthToken} from '@/components/wrapped/gapi.ts';

export async function loadAllPlants() {
    return await fetch(`${getBackendUrl()}/plants`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
    })
}

export async function getPlantById(plantId: string | RouteParamValue[]) {
    return await fetch(`${getBackendUrl()}/plants/${plantId}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
    })
}

export async function getMediaById(mediaId: string) {
    return await fetch(`${getBackendUrl()}/media/${mediaId}`, {
        method: 'GET',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
    })
}

export async function uploadNewPlant(plantName: string, plantType: string, timeCreated: number) {
    await fetch(`${getBackendUrl()}/plants`, {
        method: 'POST',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: plantName,
            type: plantType,
            createdAt: (new Date(timeCreated)).getTime(),
        }),
    })
}

export async function uploadMedia(type: string, data: any): Promise<Response> {
    return await fetch(`${getBackendUrl()}/media?contentType=${type}`, {
        method: 'POST',
        body: data,
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        }
    });
}

export async function uploadJournalEntry(plantId: number, journalId: string, type: string, mediaId: string) {
    await fetch(`${getBackendUrl()}/plants/${plantId}/journal-entries`, {
        method: 'POST',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
        body: JSON.stringify({
            id: journalId,
            plantId: plantId,
            createdAt: Date.now(),
            type: type,
            mediaId: mediaId
        }),
    })
}

export async function deletePlantById(plantId: string | RouteParamValue[]) {
    //if (confirm('Are you sure?')) {
        await fetch(`${getBackendUrl()}/plants/${plantId}`, {
            method: 'DELETE',
            headers: {
                'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
            },
        })
        await router.push('/');
    //}
}

export async function deleteJournalEntry(journalId: string) {
    await fetch(`${getBackendUrl()}/journal-entries/${journalId}`, {
        method: 'DELETE',
        headers: {
            'X-Auth-Token': (await getAuthToken()), 'Content-type': 'application/json',
        },
    })
    window.location.reload();
}

export function getBackendUrl(): string {
    return "http://localhost:8080";
}

