using FluentValidation;
using Serilog;
using System.Net;
using System.Text.Json;
using WalletManagement.Domain.Exceptions;

namespace WalletManagement.WebAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            // hata tipine göre durum kodu ve log seviyesi belirleme işlemi:
            var (statusCode, message) = exception switch
            {
                ValidationException valEx => (HttpStatusCode.BadRequest, string.Join("  |  ", valEx.Errors.Select(e => e.ErrorMessage))),
                BaseBusinessException => (HttpStatusCode.BadRequest, exception.Message),
                UnauthorizedAccessException => (HttpStatusCode.Unauthorized, exception.Message), 
                KeyNotFoundException => (HttpStatusCode.NotFound, exception.Message), 
                _ => (HttpStatusCode.InternalServerError, "Sunucu taraflı beklenmedik bir hata oluştu.")
            };

            context.Response.StatusCode = (int)statusCode;

            if (statusCode == HttpStatusCode.InternalServerError)
                Log.Error(exception, "Kritik Sistem Hatası: {Message}", exception.Message);
            else
                Log.Warning("İş Mantığı İhlali: {Message}", exception.Message);

            var response = new
            {
                Status = context.Response.StatusCode,
                Message = message,
                Detail = exception.GetType().Name
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }

    }
}
