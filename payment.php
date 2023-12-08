<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "ECommerce";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id = 1; 
$cart = json_decode($_POST['cart'], true);

$totalAmount = 0;
foreach ($cart as $item) {
    $totalAmount += $item['price'] * $item['quantity'];
}

$insertOrderSQL = "INSERT INTO ORDERS (user_id, total_amount) VALUES (?, ?)";
$stmt = $conn->prepare($insertOrderSQL);
$stmt->bind_param("di", $user_id, $totalAmount);
$stmt->execute();
$order_id = $stmt->insert_id; 

$insertDetailsSQL = "INSERT INTO ORDER_DETAILS (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($insertDetailsSQL);

foreach ($cart as $item) {
    $product_id = $item['id'];
    $quantity = $item['quantity'];
    $price = $item['price'];

    $stmt->bind_param("iiid", $order_id, $product_id, $quantity, $price);
    $stmt->execute();
}

$stmt->close();
$conn->close();

$response = array('status' => 'success', 'message' => 'Payment processed successfully');
echo json_encode($response);
?>
