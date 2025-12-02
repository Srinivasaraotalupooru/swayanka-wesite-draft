using System;

namespace Swayanka.BlazorClient.Services
{
    public class AuthService
    {
        public bool IsAuthenticated { get; private set; }
        public string UserId { get; private set; } = "guest-user";
        public event Action? OnChange;

        public void Login()
        {
            IsAuthenticated = true;
            NotifyStateChanged();
        }

        public void Logout()
        {
            IsAuthenticated = false;
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}
