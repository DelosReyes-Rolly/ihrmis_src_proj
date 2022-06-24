<?php

namespace App\Http\Controllers\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonResource;
use App\Models\Library\DocumentRequirements as LibraryDocumentRequirements;
use Illuminate\Http\Request;

class DocumentRequirements extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CommonResource::collection(
            LibraryDocumentRequirements::with('Category')->get(),
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
        // return $request;
        return LibraryDocumentRequirements::updateOrCreate(
            [
                'doc_id' => $request->doc_id,
            ],
            [
                'doc_name' => $request->doc_name,
                'doc_group' => $request->doc_group,
            ]
        );
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($doc_id)
    {
        LibraryDocumentRequirements::where('doc_id', $doc_id)->delete();
        return response()->json([
            'status' => 200,
            'message' => "Deleted Succesfully",
        ]);
    }
}
