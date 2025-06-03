<?php
include 'db.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
      if (isset($_GET['UserID'])) {
        if (isset($_GET['SongID'])) {
            $SongID = $_GET['SongID'];
            $UserID = $_GET['UserID'];
            $result = $conn->execute_query("SELECT COUNT(*) FROM userlikes WHERE SongID=? AND UserID=?;", [$SongID, $UserID]);
            $data = $result->fetch_assoc();
            echo json_encode($data['COUNT(*)']);
        } 
      } else{
        if (isset($_GET['SongID'])) {
            $SongID = $_GET['SongID'];
            $result = $conn->execute_query("SELECT COUNT(*) FROM userlikes WHERE SongID=?;", [$SongID]);
            $data = $result->fetch_assoc();
            echo json_encode($data['COUNT(*)']);
        } else {
            $result = 0;
            echo json_encode($result);
        }
      }
      break;     

    case 'POST':
        error_log(print_r($input,true));

        $SongID = $input['SongID'];
        $UserID = $input['UserID'];

        $result = $conn->execute_query("SELECT COUNT(*) FROM userlikes WHERE SongID=? AND UserID=?;", [$SongID,$UserID]);
        $found=$result->fetch_assoc();
        if ($found['COUNT(*)']>0) {
          echo json_encode(["message" => "Vote was already counted"]);
        } else {
          $conn->execute_query("INSERT INTO userlikes (SongID,UserID) VALUES (?,?);", [$SongID,$UserID]);
          echo json_encode(["message" => "Your vote has been counted"]);
        }

        #$conn->execute_query("INSERT INTO userlikes (SongID, UserID) SELECT ?,? FROM userlikes WHERE NOT EXISTS(SELECT 1 FROM userlikes WHERE SongID=? AND UserID=?);",[$SongID,$UserID,$SongID,$UserID]);
        #echo json_encode(["message" => "Like added successfully"]);
        break;

    case 'DELETE':
        $SongID = $input['SongID'];
        $UserID = $input['UserID'];
        $result = $conn->execute_query("DELETE FROM userlikes WHERE SongID=? AND UserID=?;", [$SongID, $UserID]);     

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>
