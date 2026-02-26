# Cüzdan Yönetim Sistemi - Clean Architecture

Bu proje, .NET 8 ve React kullanılarak geliştirilmiş; güvenlik, performans ve sürdürülebilirlik odaklı bir Cüzdan Yönetim Sistemi'dir. Proje, bağımlılıkları minimize eden ve test edilebilirliği artıran Clean Architecture (Temiz Mimari) prensiplerine uygun olarak tasarlanmıştır.

## 🏗️ Mimari Yapı ve Tasarım Desenleri

Core (Domain & Application): Entity'ler, özel istisnalar (Exceptions) ve merkezi iş mantığını (WalletManager) içerir.

Infrastructure (Altyapı): Entity Framework Core ve MS SQL Server kullanarak veri kalıcılığını sağlar.

Presentation (Web API): RESTful uç noktaları (Endpoints) içerir ve Swagger ile dokümante edilmiştir.

UI (React): Tailwind CSS ile güçlendirilmiş, modern ve kullanıcı dostu bir arayüz sunar.

## 🚀 Öne Çıkan Özellikler

Güvenli İşlemler: Para yatırma ve çekme işlemleri, yüksek performans ve veri bütünlüğü için Stored Procedure'ler üzerinden yürütülür.

Eşzamanlılık (Concurrency) Yönetimi: Aynı anda yapılan para çekme işlemlerinde bakiye tutarlılığını korumak için gerekli mekanizmalar uygulanmıştır.

JWT Kimlik Doğrulama: Kullanıcı kayıt ve giriş işlemleri, token tabanlı güvenli yetkilendirme ile korunmaktadır.

Gelişmiş Listeleme: İşlem geçmişi; tarih aralığı filtresi ve zorunlu sayfalama (Paging) ile optimize edilmiştir.

Birim Testleri: Merkezi iş mantığı, xUnit ve Moq kütüphaneleri kullanılarak test edilmiştir.

## 🛠️ Teknoloji Yığını
Backend: .NET 8, EF Core, ASP.NET Core Web API

Frontend: React, Tailwind CSS, Axios

Veritabanı: MS SQL Server

Test: xUnit, Moq

## ⚙️ Kurulum ve Çalıştırma

#### 1 Veritabanı Kurulumu

Database/ klasörüne gidin.

script.sql dosyasını SQL Server üzerinde çalıştırarak tabloları, stored procedure'leri ve şemayı oluşturun.

Web API projesindeki appsettings.json dosyasında bulunan ConnectionStrings bölümünü kendi sunucunuza göre güncelleyin.


#### 2 Backend Çalıştırma

cd WalletManagementSystem
dotnet restore
dotnet run --project Presentation/WalletManagement.WebAPI

#### 3. Frontend Çalıştırma

cd walletmanagement-ui
npm install
npm start

## 🧪 Testleri Çalıştırma

dotnet test


