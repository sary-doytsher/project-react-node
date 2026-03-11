# Script להורדת תמונות placeholder (PowerShell)

Write-Host "יוצר תמונות placeholder..." -ForegroundColor Green

$images = @(
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
    "laptop.jpg",
    "phone.jpg",
    "tablet.jpg",
    "headphones.jpg",
    "camera.jpg"
)

$baseUrl = "https://via.placeholder.com/400x300/0066cc/ffffff?text="

foreach ($image in $images) {
    $name = $image.Replace(".jpg", "")
    $url = "$baseUrl$name"
    $output = "public/images/$image"
    
    Write-Host "מוריד $image..." -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -ErrorAction Stop
        Write-Host "✓ $image הורד בהצלחה" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ שגיאה בהורדת $image" -ForegroundColor Red
    }
}

Write-Host "`nסיים! כל התמונות נמצאות ב-public/images/" -ForegroundColor Green
Write-Host "הערה: אלו תמונות placeholder. מומלץ להחליף באיכותיות יותר." -ForegroundColor Cyan
