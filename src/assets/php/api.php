<?php
include 'db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['SongID'])) {
            $SongID = $_GET['SongID'];
            $result = $conn->execute_query("SELECT COUNT(*) FROM userlikes WHERE SongID=?;", [$SongID]);
            $data = $result->fetch_assoc();
            echo json_encode($data['COUNT(*)']);
        } else {
            $result = 0;
            echo json_encode($result);
        }
        break;

    case 'POST':
        $SongID = $input['SongID'];
        $UserID = $input['UserID'];
        $conn->execute_query("INSERT INTO userlikes (SongID, UserID) VALUES (?,?) WHERE NOT EXISTS(SELECT * FROM userlikes WHERE SongID=? AND UserID=?);",[$SongID, $UserID,$SongID, $UserID]);
        echo json_encode(["message" => "Like added successfully"]);
        break;

    # case 'DELETE':
        # DELETE FROM userlikes WHERE SongID='1' 
        # AND UserID='1' 
        # ORDER BY SongID
        # LIMIT 1;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>