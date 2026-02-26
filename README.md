# Cüzdan Yönetim Sistemi - Clean Architecture - WebAPI

Bu proje, .NET 8 ve React kullanılarak geliştirilmiş; kullanıcıların cüzdan oluşturabildiği, güvenli para yatırma/çekme işlemleri yapabildiği ve işlem geçmişini görüntüleyebildiği kapsamlı bir Cüzdan Yönetim API ve React UI uygulamasıdır. Proje, bağımlılıkların içe doğru olduğu, sürdürülebilir ve test edilebilir bir mimari olan **Clean Architecture** prensiplerine göre geliştirilmiştir.

## 🏗️ Mimari Katmanlar ve Klasör Yapısı

### 1. Core

- **Domain**: User, Wallet, Transaction gibi temel entity'leri ve domain-specific exception sınıflarını (ör: InsufficientFundsException) barındırır.

- **Concrete**: Repository interface'lerinin tanımlandığı katmandır.

- **Application**: İş kurallarını tanımlayacak olan Manager interface'lerinin barındığı; DTO, Mappings ve Validators yapılarının yazıldığı katmandır.


### 2. Infrastructure

- **InnerInfrastructure**: İş kurallarının uygulandığı, Manager interface'lerinin implement edildiği katmandır.
- **Persistence**: EF Core DbContext yapılandırması, veritabanı ile ilişkili Repository interface'lerinin uygulanması ve migration işlemlerinin uygulaması bu katmandadır.

### 3. Presentation (WalletManagement.WebAPI)

- Jwt korumalı REST endpointlerinin sunulduğu ve Swagger üzerinden tüm API dokümantasyonuna erişilebildiği yapıdır.

### 4. React UI

- Tailwind CSS ile güçlendirilmiş, modern ve kullanıcı dostu bir arayüz sunar.

-----


## 🚀 Öne Çıkan Özellikler & Teknik Detaylar

- **Stored Procedure Kullanımı**: Para yatırma ve çekme işlemleri, yüksek performans ve veri bütünlüğü için **Stored Procedure**'ler üzerinden yürütülür.

- **Concurrency & Idempotency**: Aynı cüzdandan paralel para çekme isteklerinde tutarlılık korunur. ReferenceId kontrolü ile idempotency engellenir.

- **JWT Kimlik Doğrulama**: Kullanıcı kayıt ve giriş işlemleri, **token tabanlı güvenli yetkilendirme** ile korunmaktadır.

- **Gelişmiş Filtreleme & Paging**: İşlem geçmişi; tarih aralığı filtresi ve sayfalama (paging) ile optimize edilmiştir.

- **Birim Testleri**: Merkezi iş mantığı, xUnit ve Moq kütüphaneleri kullanılarak test edilmiştir.

- **Logging**: Tüm servis çağırımları merkezi bir yapı üzerinden yapılandırılmış şekilde loglanır.

-----


## 🛠️ Kullanılan Teknolojiler

- **Backend: .NET 8, EF Core, ASP.NET Core Web API**

- **Frontend: React, Tailwind CSS, Axios**

- **Veritabanı: MS SQL Server**

- **Test: xUnit, Moq**


-----


## ⚙️ Kurulum ve Çalıştırma

#### 1 Veritabanı Kurulumu

- ***Database/script.sql*** dosyasını SQL Server'da çalıştırın.

- ***script.sql*** dosyasını SQL Server üzerinde çalıştırarak tabloları, stored procedure'leri ve şemayı oluşturun.

- ***Presentation/WalletManagement.WebAPI/appsettings.json*** içindeki ***ConnectionString***'i kendi SQL Server adresinize göre düzenleyin.

-----


#### 2 Backend(API) Çalıştırma

- Projenin ana dizininde terminali açarak şu komutları çalıştırın:

```bash
cd WalletManagementSystem
dotnet restore
dotnet run --project Presentation/WalletManagement.WebAPI
```

- **API URL**:API varsayılan olarak ***http://localhost:5138*** üzerinden yayın yapmaktadır.
- **Swagger**: ***http://localhost:5138/swagger***

-----


#### 3. Frontend (UI) Çalıştırma

- **walletmanagement-ui** klasöründe terminali açın:


```bash
cd walletmanagement-ui
npm install
npm start
```

**URL**: Uygulama ***http://localhost:3000*** portunda açılacaktır.


-----


## 📝 Örnek Test Verileri ve Kullanım Senaryosu

**Test Hesabı Bilgileri (Örnek)**

- Aşağıdaki bilgilerle veritabanı örnek kullanım senaryoları ile doldurulmuştur. 

| Kullanıcı Adı | Şifre | Test Cüzdan ID'leri |
| :--- | :--- | :--- |
| `ugurcankadi` | `kadiugurcn3253` | `2` ve `3` |


-----


## 🖼️ Proje İle İlgili Ekran Görüntüleri


### 🏠 Giriş: 

<img src="https://github.com/user-attachments/assets/dc7deaaf-c47b-424a-9ca5-2a8385b47166" width:600>


<img src="https://github.com/user-attachments/assets/f37183b2-bf64-425c-84bc-d9a7af2aadaa" width:600>

### 🪪 Kayıt: 

<img src="https://github.com/user-attachments/assets/ee4515dc-5c12-40ef-8922-5f9db9387068" width:600>


<img src="https://github.com/user-attachments/assets/3822fbd5-073f-4c7f-acd4-7ccfba19c216" width:600>


## 📋 Ana Sayfa

<img src="https://github.com/user-attachments/assets/07f6b941-36d6-4acc-978f-5e42d8055bde" width:600>


<img src="https://github.com/user-attachments/assets/5295cacb-5e00-4ceb-aa6f-16a3b8033528" width:600>


<img src="https://github.com/user-attachments/assets/f233bd8a-405d-45b6-9489-bab6450af4dc" width:600>


#### 👛 Yeni Cüzdan Oluşturma İşlemi:


<img src="https://github.com/user-attachments/assets/88351043-2d95-4a2d-98db-27dc20f736ac" width:600>


<img src="https://github.com/user-attachments/assets/472b6d02-ff38-49f8-9182-a2c7b606eb72" width:600>


#### ❓ Bakiyesi Bulunan Cüzdanı Silme İsteği:

<img src="https://github.com/user-attachments/assets/20d46526-9690-4190-a0e4-fe21033a6fc5" width:600>


<img src="https://github.com/user-attachments/assets/c1c6ec55-6982-440d-8323-6443c319d76b" width:600>


## ➡️ İşlem Sayfası


<img src="https://github.com/user-attachments/assets/cba4cdb1-d431-448c-9b13-5ce08a4c0331" width:600>


<img src="https://github.com/user-attachments/assets/bd2171ca-c7a8-4eb0-b53f-c49d19a60be1" width:600>


#### ✅ Onay Kartı

<img src="https://github.com/user-attachments/assets/871adcc7-6998-4257-8a5b-949e5def7ce7" width:600>


#### ❌ Bakiyeyi Aşan Miktarda Para Çekme İsteği:


<img src="https://github.com/user-attachments/assets/39af1a37-dce6-40b1-962a-3b2fa2a48391" width:600>


<img src="https://github.com/user-attachments/assets/975b04d7-c578-43ac-bbe6-464dff8e9386" width:600>



## 📈 İşlem Geçmişi Sayfası (Tarih Filtreleme & Sayfalama)


<img src="https://github.com/user-attachments/assets/3cfd0e5b-32a4-423a-98c9-32c2b5e5bc56" width:600>


<img src="https://github.com/user-attachments/assets/4de20939-3538-4366-bf9d-d8aeab53a451" width:600>








