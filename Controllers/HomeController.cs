
using Microsoft.AspNetCore.Mvc;
using Tarea1_Semana1_AW.Models;

namespace Tarea1_Semana1_AW.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var persona = new PersonaModel
            {
                NombreCompleto = "Bryan Medina",
                Edad = 20,
                Direccion = "Ambato – Izamba, Ecuador",
                Telefono = "0995 559 884",
                FechaNacimiento = "28 de marzo, 2006",
                Carrera = "Ingeniería en Software",
                Universidad = "UNIANDES – Ambato",
                AnioInicio = "2026 – En curso",
                Bio = "Soy Bryan Medina, estudiante de Ingeniería en Software en la " +
                                  " UNIANDES " +
                                  "Me gusta el desarrollo web, los algoritmos y construir " +
                                  "soluciones que tengan impacto real.",
            
            };

            return View(persona);
        }
    }
}