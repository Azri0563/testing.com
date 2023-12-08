<?php
$hostname = "your_database_host";
$username = "your_database_username";
$password = "your_database_password";
$database = "PaymentInformation";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$thankYouMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST["name"];
    $paymentDate = $_POST["paymentDate"];
    $phoneNumber = $_POST["phoneNumber"];
    $email = $_POST["email"];

    $proofOfPayment = file_get_contents($_FILES["proofOfPayment"]["tmp_name"]);

    $stmt = $conn->prepare("INSERT INTO PaymentInformation (name, payment_date, phone_number, email, proof_of_payment) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $paymentDate, $phoneNumber, $email, $proofOfPayment);
    $stmt->execute();
    $stmt->close();

    $conn->close();

    $thankYouMessage = "Thank You for purchasing our products";
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Form</title>
</head>
<body>

    

    <form class="form-container" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post" enctype="multipart/form-data">
        <h1 style="color: blueviolet; text-decoration: underline; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;">PAYMENT INFORMATION</h1>

            <?php if ($thankYouMessage !== "") : ?>

            <div class="modal-container" id="myModal">
                <div class="modal-content">
                    <p><?php echo $thankYouMessage; ?></p>
                    <button onclick="closeModal()">Close</button>
                </div>
            </div>
            <script>
                window.onload = function () {
                    document.getElementById('myModal').style.display = 'flex';
                };

                function closeModal() {
                    document.getElementById('myModal').style.display = 'none';
                    window.location.href = 'Index.html'; 
                }
            </script>
            <?php endif; ?>

            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
    
            <label for="paymentDate">Payment Date:</label>
            <input type="date" id="paymentDate" name="paymentDate" required>
    
            <label for="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{3}-[0-9]{7,8}" placeholder="123-4567890" required>
    
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
    
            <label for="proofOfPayment">Payment Receipt:</label>
            <input type="file" id="proofOfPayment" name="proofOfPayment" accept="image/*" required>
    
        <input type="submit" value="Submit">
    </form>

</body>
</html>
