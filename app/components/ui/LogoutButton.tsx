<button
  onClick={() => {
    localStorage.removeItem('token')
    document.cookie = `token=; path=/; max-age=0`
    window.location.href = '/login'
  }}
  className="text-sm text-red-500"
>
  Logout
</button>