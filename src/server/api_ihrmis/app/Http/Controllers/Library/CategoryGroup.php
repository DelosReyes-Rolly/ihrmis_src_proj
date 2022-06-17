<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Library\CategoryGroupModel;
use Illuminate\Http\Request;

class CategoryGroup extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommonResource::collection(
            CategoryGroupModel::get(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return CategoryGroupModel::updateOrCreate(
            [
                'grp_id' => $request->grp_id,
            ],
            [
                'grp_name' => $request->grp_name,
                'grp_level' => $request->grp_level,
                'grp_cluster' => $request->grp_cluster,
            ]
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($grp_id)
    {
        CategoryGroupModel::where('grp_id', $grp_id)->delete();

        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
