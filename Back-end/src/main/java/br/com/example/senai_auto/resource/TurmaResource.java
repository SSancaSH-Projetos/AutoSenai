package br.com.example.senai_auto.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.com.example.senai_auto.entity.Turma;
import br.com.example.senai_auto.repository.TurmaRepository;

import java.util.List;

@RestController
@RequestMapping("/senaiauto")
public class TurmaResource {
	@Autowired
	private TurmaRepository turmaRepository;
	
	@PostMapping("/turmas/nova-turma")
	public Turma adicionaTurma(@RequestBody Turma turma) {
		return turmaRepository.save(turma);
	}

	@GetMapping("/turmas")
	public List<Turma> getTurmas() {
		return turmaRepository.findAll();
	}
}

//	@DeleteMapping("/turmas/deletar/{id}")
//	public String deletaTurma(@PathVariable Long id) {
//	turmaRepository.deleteById(id);
//	return ('Turma apagada');
//	}