import {ApiProfileUpsert, ApiProfileDelete} from "../../models/api_profile/apiProfile.model";


export interface ApiProfileUpsertResponse {
    code: number;
    result: ApiProfileUpsert
}

export interface ApiProfileDeleteResponse {
    code: number;
    result: ApiProfileDelete
}