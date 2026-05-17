
namespace Tarea1_Semana1_AW.Models
{
    public class PersonaModel
    {
        public string NombreCompleto { get; set; }
        public int Edad { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string FechaNacimiento { get; set; }
        public string Carrera { get; set; }
        public string Universidad { get; set; }
        public string AnioInicio { get; set; }
        public string Bio { get; set; }
        public List<string> Habilidades { get; set; }
    }
}